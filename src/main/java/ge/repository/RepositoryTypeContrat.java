package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryTypeContrat extends JpaRepository<ge.model.ModelTypeContrat, Long> {

}
