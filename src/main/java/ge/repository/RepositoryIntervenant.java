package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryIntervenant extends JpaRepository<ge.model.ModelIntervenant, Long> {

}
