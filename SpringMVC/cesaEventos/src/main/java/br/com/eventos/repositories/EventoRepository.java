package br.com.eventos.repositories;

import br.com.eventos.models.Evento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

// Interface que vai acessar o banco de dados através
// do JPA - Através da Herança
@Repository
@Transactional
public interface EventoRepository extends JpaRepository<Evento, Long> {
    //Busca na tabela 'evento' todos os resultados de acordo com o status
    @Query("select s from Evento s where status = ?1")
    List<Evento> findByStatus(String status);
}
