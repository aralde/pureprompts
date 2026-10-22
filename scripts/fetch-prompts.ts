
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define interfaces to match src/lib/mock-data.ts
interface PromptMetadata {
    description: string;
    author: string;
    version: string;
    category: string;
    tags: string[];
    globs: string[];
}

interface Prompt {
    id: string;
    title: string;
    content: string;
    metadata: PromptMetadata;
}

interface CsvRow {
    act: string;
    prompt: string;
    for_devs: string; // "TRUE" or "FALSE"
    type: string;     // "TEXT"
    contributor: string;
}

const CSV_URL = 'https://raw.githubusercontent.com/f/prompts.chat/main/prompts.csv';
const OUTPUT_PATH = path.join(__dirname, '../src/data/external-prompts.json');

// Improved CSV Parser
function parseCsv(csvText: string): Record<string, string>[] {
    const result: string[][] = [];
    let currentField = '';
    let inQuotes = false;
    let currentRow: string[] = [];

    for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (inQuotes) {
            if (char === '"' && nextChar === '"') {
                currentField += '"';
                i++; // Skip the escaped quote
            } else if (char === '"') {
                inQuotes = false;
            } else {
                currentField += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                currentRow.push(currentField);
                currentField = '';
            } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
                currentRow.push(currentField);
                result.push(currentRow);
                currentRow = [];
                currentField = '';
                if (char === '\r') i++; // Skip \n
            } else {
                currentField += char;
            }
        }
    }

    if (currentField || currentRow.length > 0) {
        currentRow.push(currentField);
        result.push(currentRow);
    }

    // Use headers from first row
    const headers = result[0].map((h: string) => h.toLowerCase().trim().replace(/^"|"$/g, ''));

    return result.slice(1).map(values => {
        const row: Record<string, string> = {};
        headers.forEach((header: string, index: number) => {
            row[header] = values[index];
        });
        return row;
    });
}

function slugify(text: string): string {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

async function main() {
    console.log('Fetching prompts from:', CSV_URL);

    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        console.log(`Fetched ${csvText.length} bytes.`);

        const rows = parseCsv(csvText) as unknown as CsvRow[];
        console.log(`Parsed ${rows.length} prompts.`);

        const prompts: Prompt[] = rows
            .filter(row => row.act && row.prompt) // Filter out empty rows
            .map((row) => {
                const title = row.act;
                const id = slugify(title);

                // Truncate description for metadata
                const description = row.prompt.length > 150
                    ? row.prompt.substring(0, 147) + '...'
                    : row.prompt;

                // Determine category (Naive logic for now)
                // Since original CSV doesn't have detailed categories other than 'for_devs'
                // We can try to guess or just default
                let category = 'General';
                if (typeof row.for_devs === 'string' && row.for_devs.toUpperCase() === 'TRUE') {
                    category = 'Coding';
                }

                // Tags
                const tags = ['external'];
                if (category === 'Coding') tags.push('coding', 'development');
                else tags.push('general', 'assistant');

                return {
                    id: id,
                    title: title,
                    content: `# ${title}\n\n${row.prompt}`,
                    metadata: {
                        description: description,
                        author: row.contributor || 'Unknown',
                        version: '1.0',
                        category: category,
                        tags: tags,
                        globs: []
                    }
                };
            });

        // Ensure directory exists
        const dir = path.dirname(OUTPUT_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_PATH, JSON.stringify(prompts, null, 2));
        console.log(`Successfully saved ${prompts.length} prompts to ${OUTPUT_PATH}`);

    } catch (error) {
        console.error('Error fetching prompts:', error);
        process.exit(1);
    }
}

main();
