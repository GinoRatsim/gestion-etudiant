package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAbsences extends JpaRepository<ge.model.ModelAbsences, Long> {

}
