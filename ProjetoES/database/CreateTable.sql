create database projeto_integrado;
use projeto_integrado;
-- Tebela de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    ativo TINYINT(1) DEFAULT 1,
    data_nascimento DATE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamento
CREATE TABLE Consulta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomePaciente VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    clinica VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    dataAgendamento DATETIME NOT NULL
);

-- Tabela do medico

CREATE TABLE Medico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    especialidade VARCHAR(255),
    crm VARCHAR(20) NOT NULL
);