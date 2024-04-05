package br.com.projetoES.ProjetoES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoES.ProjetoES.DAO.UsuariosInterface;
import br.com.projetoES.ProjetoES.entities.Usuario;
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuariosInterface dao;
    
     @GetMapping
       public List<Usuario> listaUsuarios() {
        return (List<Usuario>) dao.findAll();
     }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return usuarioNovo;
    }

    @PutMapping
    public Usuario editarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return usuarioNovo;
    }
   
    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirUsuario(@PathVariable Long id){
        if (dao.existsById(id)) {
            dao.deleteById(id);
            return new ResponseEntity<>("Usuário excluído com sucesso!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
   }
}
