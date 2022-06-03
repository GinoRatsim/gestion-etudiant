package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryModule extends JpaRepository<ge.model.ModelModule, Long> {

}
