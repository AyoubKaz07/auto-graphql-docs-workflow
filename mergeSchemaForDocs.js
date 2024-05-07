const fs = require('fs');
const path = require('path');

// Path to the directory containing the schema files
const schemaDir = path.join(__dirname, 'graphql', 'typeDefs');

function readSchemaFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sdlMatch = content.match(/#graphql([\s\S]*?)(`|$)/); // Match everything until backtick or end of file
  return sdlMatch ? sdlMatch[1].trim() : '';
}

function readAllSchemaFiles(dir) {
  const files = fs.readdirSync(dir);
  const schemaContent = files
    .filter(file => file !== 'index.ts') // Exclude index.ts
    .map(file => readSchemaFile(path.join(dir, file)))
    .join('\n\n');
  return schemaContent;
}

// Write the merged schema to a file
const mergedSchema = readAllSchemaFiles(schemaDir);
fs.writeFileSync(path.join(__dirname, 'mergedSchema.gql'), mergedSchema);

console.log('Merged schema file generated: mergedSchema.gql');
