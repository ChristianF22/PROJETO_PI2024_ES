package br.com.projetoES.ProjetoES.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.projetoES.ProjetoES.DAO.UsuariosInterface;
import br.com.projetoES.ProjetoES.entities.Usuario;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuariosInterface dao;
    
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return dao.findAll();
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario){
        Usuario usuarioNovo = dao.save(usuario);
        return new ResponseEntity<>(usuarioNovo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado){
        if (!dao.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        usuarioAtualizado.setId(id);
        Usuario usuarioAtual = dao.save(usuarioAtualizado);
        return new ResponseEntity<>(usuarioAtual, HttpStatus.OK);
    }
   
    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirUsuario(@PathVariable Long id){
        if (!dao.existsById(id)) {
            return new ResponseEntity<>("Usuário não encontrado", HttpStatus.NOT_FOUND);
        }
        dao.deleteById(id);
        return new ResponseEntity<>("Usuário excluído com sucesso!", HttpStatus.OK);
    }
}
