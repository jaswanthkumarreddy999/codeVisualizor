const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
dotenv.config({ path: path.join(__dirname, '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const UserSchema = new mongoose.Schema({
      email: String,
      name: String,
      role: String,
    });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const users = await User.find({}, 'email name role');
    console.log('--- List of Users ---');
    if (users.length === 0) {
      console.log('No users found in database.');
    } else {
      users.forEach(u => {
        console.log(`- ${u.name} (${u.email}) [Role: ${u.role}]`);
      });
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
