package br.com.projetoES.ProjetoES.controller;

import br.com.projetoES.ProjetoES.DAO.RecepcionistaInterface;
import br.com.projetoES.ProjetoES.entities.Recepcionista;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RecepcionistaLoginController {

    @Autowired
    private RecepcionistaInterface recepcionistaInterface;

    @GetMapping("/recep")
    public String showLoginPage() {
        return "receplogin";
    }

    @PostMapping("/recep")
    public String login(@RequestParam String login, @RequestParam String senha, Model model) {
        try {
            Recepcionista recepcionista = recepcionistaInterface.findByLogin(login);

            if (recepcionista != null && recepcionista.getSenha().equals(senha)) {
                model.addAttribute("recpName", recepcionista.getLogin());
                return "redirect:/pacientes";
            } else {
                model.addAttribute("erro", "Credenciais inválidas.");
                return "receplogin";
            }
        } catch (Exception e) {
            model.addAttribute("erro", "Ocorreu um erro durante o login. Por favor, tente novamente.");
            return "receplogin";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/recep";
    }
}