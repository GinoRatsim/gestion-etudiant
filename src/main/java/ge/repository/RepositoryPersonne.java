package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPersonne extends JpaRepository<ge.model.ModelPersonne, Long> {

}
