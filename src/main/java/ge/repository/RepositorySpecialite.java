package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositorySpecialite extends JpaRepository<ge.model.ModelSpecialite, Long> {

}
