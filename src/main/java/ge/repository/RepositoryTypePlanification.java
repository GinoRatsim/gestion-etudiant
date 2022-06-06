package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelTypePlanification;

@Repository
public interface RepositoryTypePlanification extends JpaRepository<ge.model.ModelTypePlanification, Long> {
	

	@Query(value = "SELECT * FROM type_planification WHERE libelle_type_planification LIKE '%RATTRAPAGE%' OR '%rattrapage%'", nativeQuery = true)
	List<ModelTypePlanification> getTypePlanificationP();

}
