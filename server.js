const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

let comments = []; // Tempat menyimpan komentar

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>XSS Stored Demo</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f2f2f2;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h1 {
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    width: 100%;
                    text-align: center;
                    margin: 0;
                    border-bottom: 5px solid #388E3C;
                }
                h2 {
                    color: #4CAF50;
                    margin-top: 20px;
                }
                form {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin: 20px;
                    width: 90%;
                    max-width: 600px;
                }
                textarea {
                    width: calc(100% - 22px);
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                    box-sizing: border-box;
                }
                button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin-top: 10px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #45a049;
                }
                #comments {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin: 20px;
                    width: 90%;
                    max-width: 600px;
                }
                #comments div {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                    margin-bottom: 10px;
                }
                #comments div:last-child {
                    border-bottom: none;
                }
            </style>
        </head>
        <body>
            <h1>Komentar Pengguna</h1>
            <form action="/comment" method="post">
                <textarea name="comment" rows="4" placeholder="Tulis komentar Anda"></textarea><br>
                <button type="submit">Kirim</button>
            </form>
            <h2>Komentar yang Dikirim</h2>
            <div id="comments">
                ${comments.map(c => `<div>${escapeHtml(c)}</div>`).join('')}
            </div>
        </body>
        </html>
    `);
});


// Endpoint untuk menangani komentar
app.post('/comment', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
