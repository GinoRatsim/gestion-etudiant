package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryEtudiant extends JpaRepository<ge.model.ModelEtudiant, Long> {

}
