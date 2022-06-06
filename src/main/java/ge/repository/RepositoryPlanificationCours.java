package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelPlanificationCours;

@Repository
public interface RepositoryPlanificationCours extends JpaRepository<ge.model.ModelPlanificationCours, Long> {
	

	@Query(value = "SELECT planification_cours.* FROM planification_cours "
			+ "JOIN type_planification ON type_planification.id_type_planification = planification_cours.id_type_planification "
			+ "WHERE type_planification.libelle_type_planification = 'RATTRAPAGES'", nativeQuery = true)
	List<ModelPlanificationCours> getPlaningPedagogie();

}
