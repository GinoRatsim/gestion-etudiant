package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAnciens extends JpaRepository<ge.model.ModelAnciens, Long> {

}
