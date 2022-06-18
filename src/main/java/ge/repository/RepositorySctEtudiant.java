package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorySctEtudiant extends JpaRepository<ge.model.ModelSctEtudiant, Long> {

}
