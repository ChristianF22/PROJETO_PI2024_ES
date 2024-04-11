package br.com.projetoES.ProjetoES.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.com.projetoES.ProjetoES.DAO.UsuariosInterface;
import br.com.projetoES.ProjetoES.entities.Usuario;

@Controller
public class RedefinirSenha {
    
    @Autowired
    private UsuariosInterface usuariosInterface;

    @GetMapping("/esquecerSenha")
    public String exibirFormularioEsqueciSenha() {
        return "esqueci-senha";
    }

    @PostMapping("/esquecerSenha")
    @ResponseBody
    public String processarRedefinicaoSenha(@RequestParam String login, @RequestParam String novaSenha) {
        Usuario usuario = usuariosInterface.findByLogin(login);

        if (usuario != null) {
            usuario.setSenha(novaSenha);
            usuariosInterface.save(usuario);

            return "Senha atualizada com sucesso!";
        } else {
            return "Usuário não encontrado.";
        }
    }
}
