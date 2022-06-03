package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPlanificationCours extends JpaRepository<ge.model.ModelPlanificationCours, Long> {

}
