// src/app/api/users/route.js
import pool from '../../../lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database query failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  const { name, email } = await req.json();
  try {
    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return new Response(JSON.stringify({ message: 'User added' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database insert failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, email } = await req.json();
  try {
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    return new Response(JSON.stringify({ message: 'User updated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database update failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return new Response(JSON.stringify({ message: 'User deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database delete failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
