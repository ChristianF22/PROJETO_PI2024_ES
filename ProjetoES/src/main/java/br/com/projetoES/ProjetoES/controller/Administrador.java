package br.com.projetoES.ProjetoES.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Administrador {
    
    @GetMapping("/admin")
    public String adminPage(){
        return "administrador";
    }
}
