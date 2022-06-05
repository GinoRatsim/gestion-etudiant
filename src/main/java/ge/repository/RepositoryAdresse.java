package ge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelAdresse;

@Repository
public interface RepositoryAdresse extends JpaRepository<ModelAdresse, Long> {
	
	@Query(value = "SELECT * FROM adresse WHERE id_personne = ?1", nativeQuery = true)
	ModelAdresse getAdresseByPersonne(Long id);
	
}
