package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryDemandeDocument extends JpaRepository<ge.model.ModelDemandeDocument, Long> {

}
