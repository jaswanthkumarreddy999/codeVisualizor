/**
 * One-time deduplication script for MongoDB.
 * Removes duplicate public folders (same name) and their programs.
 * Keeps the OLDEST copy (earliest createdAt) of each folder.
 *
 * Usage:
 *   node scripts/deduplicate-db.js
 *
 * Requires: npm install mongodb (run from repo root)
 */

const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb+srv://me:EK7fqxUZZxCjrcP4@codevisualizor.gxwgaf9.mongodb.net/codevisualizer?retryWrites=true&w=majority&appName=codevisualizor';

async function deduplicate() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  console.log('Connected to MongoDB Atlas');

  const db = client.db('codevisualizer');
  const folders = db.collection('folders');
  const programs = db.collection('programs');

  // Get all public folders
  const publicFolders = await folders.find({ isPublic: true }).sort({ createdAt: 1 }).toArray();
  console.log(`Found ${publicFolders.length} public folders total`);

  // Group by name
  const byName = {};
  for (const folder of publicFolders) {
    if (!byName[folder.name]) byName[folder.name] = [];
    byName[folder.name].push(folder);
  }

  let deletedFolders = 0;
  let deletedPrograms = 0;

  for (const [name, copies] of Object.entries(byName)) {
    if (copies.length <= 1) continue;

    // Keep the first (oldest), delete the rest
    const toDelete = copies.slice(1);
    console.log(`\n"${name}" has ${copies.length} copies — keeping oldest (${copies[0]._id}), deleting ${toDelete.length}`);

    for (const dup of toDelete) {
      // Delete all programs in this duplicate folder
      const result = await programs.deleteMany({ folderId: dup._id.toString() });
      console.log(`  Deleted ${result.deletedCount} programs from duplicate folder ${dup._id}`);
      deletedPrograms += result.deletedCount;

      // Delete the duplicate folder
      await folders.deleteOne({ _id: dup._id });
      deletedFolders++;
      console.log(`  Deleted duplicate folder ${dup._id}`);
    }
  }

  console.log(`\nDone! Removed ${deletedFolders} duplicate folders and ${deletedPrograms} duplicate programs.`);
  await client.close();
}

deduplicate().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
