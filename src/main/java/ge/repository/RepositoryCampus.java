package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCampus extends JpaRepository<ge.model.ModelCampus, Long> {

}
