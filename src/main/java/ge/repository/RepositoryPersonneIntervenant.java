package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPersonneIntervenant extends JpaRepository<ge.model.ModelPersonneIntervenant, Long> {

}
