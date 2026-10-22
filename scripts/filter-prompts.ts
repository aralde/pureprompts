
import fs from 'fs';
import path from 'path';

interface Prompt {
    id: string;
    title: string;
    content: string;
    metadata?: {
        description?: string;
        category?: string;
        tags?: string[];
    };
    [key: string]: unknown;
}

const EXTERNAL_PROMPTS_PATH = path.join(process.cwd(), 'src', 'data', 'external-prompts.json');
const REFUSE_PROMPTS_PATH = path.join(process.cwd(), 'src', 'data', 'refusePrompts.json');

// Keywords and patterns
const CRYPTO_KEYWORDS = [
    /\bbitcoin\b/i, /\bcrypto\b/i, /\bethereum\b/i, /\bblockchain\b/i,
    /\bsolidity\b/i, /\bweb3\b/i, /\bnft\b/i, /\btokenomics\b/i, /\bbinance\b/i,
    /\bcoinbase\b/i, /\baltcoin\b/i, /\bdefi\b/i, /\bsmart contract\b/i,
    /\bwallet\b/i, /\bledger\b/i, /\btrezor\b/i
];

const HARMFUL_KEYWORDS = [
    /\bporn\b/i, /\bxxx\b/i, /\bnude (?!lips|color|make\s?up|palette|shade)\b/i,
    /\bescort\b/i,
    /\bjailbreak\b/i, /\bhack\b/i, /\bwarez\b/i,
    /\bsuicide\b/i, /\bterror\b/i,
    /\bdrugs\b/i, /\bcocaine\b/i, /\bheroin\b/i, /\bmeth\b/i
];

function isEnglish(text: string): boolean {
    // A heuristic: Check density of common English words
    const commonWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];
    const words = text.toLowerCase().split(/\s+/);
    if (words.length < 5) return true; // Too short to decide, assume safe/English or keep for manual review? 
    // Actually, if it's too short, it might be just a title. "Ethereum Developer"

    // Calculate percentage of common words
    const commonCount = words.filter(w => commonWords.includes(w)).length;
    // If no common words are found in a long text, it's likely not English.
    // Exception: very specialized technical jargon? 
    // Let's also check for non-latin characters.

    // High non-latin character count?
    // Remove non-alphanumeric, spaces, and common punctuation.
    const cleaned = text.replace(/[a-zA-Z0-9\s.,!?'"()\-:]/g, '');
    if (cleaned.length > text.length * 0.2) {
        // More than 20% weird characters? Probably non-English (Cyrillic, CJK, etc)
        return false;
    }

    // If text is long enough, expect at least SOME common words.
    if (words.length > 10 && commonCount === 0) {
        // Risk of false positive, but low common words in >10 words is suspicious for English.
        // E.g. "Hola como estas quiero una cerveza" -> 0 common english words.
        return false;
    }

    return true;
}

function containsPattern(text: string, patterns: RegExp[]): string | null {
    for (const pattern of patterns) {
        if (pattern.test(text)) {
            return pattern.source;
        }
    }
    return null;
}

async function main() {
    console.log('Reading external-prompts.json...');
    const rawData = fs.readFileSync(EXTERNAL_PROMPTS_PATH, 'utf-8');
    const prompts: Prompt[] = JSON.parse(rawData);

    console.log(`Total prompts loaded: ${prompts.length}`);

    const keptPrompts: Prompt[] = [];
    const rejectedPrompts: (Prompt & { reason: string, matched?: string })[] = [];

    for (const prompt of prompts) {
        const textToCheck = `${prompt.title} ${prompt.content} ${prompt.metadata?.description || ''}`.toLowerCase();

        // 1. Check Crypto
        const cryptoMatch = containsPattern(textToCheck, CRYPTO_KEYWORDS);
        if (cryptoMatch) {
            rejectedPrompts.push({ ...prompt, reason: 'crypto', matched: cryptoMatch });
            continue;
        }

        // 2. Check Harmful
        const harmfulMatch = containsPattern(textToCheck, HARMFUL_KEYWORDS);
        if (harmfulMatch) {
            rejectedPrompts.push({ ...prompt, reason: 'harmful', matched: harmfulMatch });
            continue;
        }

        // 3. Check Language
        // We mainly check content for language as titles can be proper names
        if (!isEnglish(prompt.content)) {
            rejectedPrompts.push({ ...prompt, reason: 'non-english' });
            continue;
        }

        keptPrompts.push(prompt);
    }

    console.log(`Processing complete.`);
    console.log(`Kept: ${keptPrompts.length}`);
    console.log(`Rejected: ${rejectedPrompts.length}`);

    console.log(`Writing to files...`);
    fs.writeFileSync(EXTERNAL_PROMPTS_PATH, JSON.stringify(keptPrompts, null, 2));
    fs.writeFileSync(REFUSE_PROMPTS_PATH, JSON.stringify(rejectedPrompts, null, 2));

    console.log('Done.');
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
