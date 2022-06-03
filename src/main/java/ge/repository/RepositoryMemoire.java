package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMemoire extends JpaRepository<ge.model.ModelMemoire, Long> {

}
