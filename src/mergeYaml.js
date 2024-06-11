// src/mergeYaml.ts
const path =require("path");
const YAML =require("yamljs");


// Define the base directory for the YAML files
const baseDir = path.join(__dirname, "openapi");


console.log(baseDir)

// Helper function to load referenced YAML files
function loadYamlRef(basePath, refPath) {
  const filePath = path.resolve(basePath, refPath);
  return YAML.load(filePath);
}

// Merge the referenced files into the main document
function mergeYamlRefs(doc, basePath) {
  if (typeof doc === 'object' && doc !== null) {
    for (const key in doc) {
      if (doc.hasOwnProperty(key)) {
        if (key === '$ref') {
          const refContent = loadYamlRef(basePath, doc[key]);
          return mergeYamlRefs(refContent, path.dirname(path.resolve(basePath, doc[key])));
        } else {
          doc[key] = mergeYamlRefs(doc[key], basePath);
        }
      }
    }
  }
  return doc;
}

// Load the main YAML file
const mainYamlPath = path.join(baseDir, "main.yaml");
const mainDocument = YAML.load(mainYamlPath);
const mergedDocument = mergeYamlRefs(mainDocument, baseDir);

// Serve the merged YAML document with Swagger UI


module.exports = mergedDocument