package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelModule;

@Repository
public interface RepositoryModule extends JpaRepository<ModelModule, Long> {

	@Query(value = "SELECT * FROM module WHERE id_niveau = ?1", nativeQuery = true)
	List<ModelModule> findModuleByNiveau(Long id);
	
}
