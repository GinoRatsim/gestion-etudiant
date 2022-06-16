package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelAcces;

@Repository
public interface RepositoryAcces extends JpaRepository<ModelAcces, Long>{

	@Query(value = "SELECT * FROM acces WHERE code_acces = 'E'; ", nativeQuery = true)
	ModelAcces getAccesEtudiant();
	
}
