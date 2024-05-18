create database projeto_integrado;
use projeto_integrado;
-- Tebela de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(200) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    ativo TINYINT(1) DEFAULT 1,
    data_nascimento DATE NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamento

CREATE TABLE Agendamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomePaciente VARCHAR(255),
    email VARCHAR(255),
    status ENUM('agendado', 'cancelado', 'realizado'),
    clinica ENUM('clinica1', 'clinica2', 'clinica3'),
    medico_id INT,
    dataHoraAgendamento DATETIME,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (medico_id) REFERENCES Medico(id)
);

-- Tabela do medico

CREATE TABLE Medico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    especialidade VARCHAR(255),
    crm VARCHAR(20) NOT NULL
);