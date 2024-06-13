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

-- Tabela do recepcionista
CREATE TABLE Recep(
   id INT PRIMARY KEY AUTO_INCREMENT,
   login VARCHAR(50) NOT NULL,
   senha VARCHAR(50) NOT NULL
);

-- Tabela do Paciente
CREATE TABLE Pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    documento VARCHAR(20) NOT NULL,
    sexo ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    data_nascimento DATE NOT NULL,
    nome VARCHAR(100) NOT NULL
);

-- Tabela do IMC
CREATE TABLE IMC (
    id INT PRIMARY KEY AUTO_INCREMENT,
    peso DECIMAL(5,2) NOT NULL,
    altura DECIMAL(4,2) NOT NULL,
    resultado DECIMAL(5,2) GENERATED ALWAYS AS (peso / (altura * altura)) STORED
);

-- Tabela da Consulta

CREATE TABLE ConsultaPaciente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    queixa_principal TEXT NOT NULL,
    medico VARCHAR(100) NOT NULL,
    diagnostico TEXT NOT NULL
);