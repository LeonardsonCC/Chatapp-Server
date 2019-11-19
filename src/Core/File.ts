import fs from 'fs';

const DB_FILE = './src/tmp/db.json';

export const writeData = (data: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_FILE, JSON.stringify(data), err => {
      reject('Falha ao escrever em arquivo');
    });
    resolve('Arquivo escrito com sucesso!');
  });
};

export const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(DB_FILE, 'utf8', (err, data) => {
      if (err) {
        reject('Erro ao ler arquivo');
      }
      const jsonData = JSON.parse(data);
      resolve(jsonData);
    });
  });
};
