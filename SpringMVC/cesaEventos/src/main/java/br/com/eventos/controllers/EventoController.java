package br.com.eventos.controllers;

import br.com.eventos.repositories.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class EventoController {

    @Autowired
    EventoRepository  eventoRepository;

    
    public String index(){
        return "evento/index";
    }

    @GetMapping("")
    //Lista todos os registros no banco de dados de com status open
    public ModelAndView verEventosOpen(){

        ModelAndView mv = new ModelAndView(index());
        mv.addObject("listaEventosOpen", eventoRepository.findByStatus("open"));

        return mv;
    }
    
    @GetMapping("/todos/eventos")

    //Lista todos os registros no banco de dados
    public ModelAndView verTodosEventos(){

        ModelAndView mv = new ModelAndView("evento/eventos");
        mv.addObject("listaEventos", eventoRepository.findAll() );

        return mv;
    }

    // insert into evento (id, `data`, descricao, nome, qtd_atual, qtd_maxima, status) 
    // values (
    //     null, 
    //     '2008-11-09', 
    //     'evento vai ser bala', 
    //     'Base do Cesa',
    //     3,
    //     5,
    //     'started')
}
