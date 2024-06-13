package br.com.projetoES.ProjetoES.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import br.com.projetoES.ProjetoES.DAO.UsuariosInterface;
import br.com.projetoES.ProjetoES.entities.Medico;
import br.com.projetoES.ProjetoES.entities.Usuario;

@Controller
public class LoginController {

    @Autowired
    private UsuariosInterface usuariosInterface;

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
    
    @PostMapping("/login")
    public String login(@RequestParam String login, @RequestParam String senha, Model model) {
        Usuario usuario = usuariosInterface.findByLogin(login);
        
        if (usuario != null && usuario.getSenha().equals(senha)) {
            model.addAttribute("userName", usuario.getNome());
            return "redirect:/agendamento";
        } else {
            model.addAttribute("error", "Credenciais inválidas. Por favor, tente novamente.");
            return "login";
        }
    }
}

