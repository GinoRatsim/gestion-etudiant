package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelComptabilite;

@Repository
public interface RepositoryComptabilite extends JpaRepository<ModelComptabilite, Long> {
	
	@Query(value = "SELECT * FROM comptabilite WHERE id_etudiant = ?", nativeQuery = true)
	List<ModelComptabilite> getComptaByEtudiant(Long id);
	
}
