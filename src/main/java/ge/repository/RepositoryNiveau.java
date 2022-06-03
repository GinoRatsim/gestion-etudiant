package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryNiveau extends JpaRepository<ge.model.ModelNiveau, Long> {

}
