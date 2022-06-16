package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ge.model.ModelContrat;

@Repository
public interface RepositoryContrat extends JpaRepository<ge.model.ModelContrat, Long> {
	
	@Query(value = "SELECT contrat.* FROM contrat LEFT JOIN etudiant ON etudiant.id_contrat = contrat.id_contrat LEFT JOIN memoire ON memoire.id_contrat = contrat.id_contrat WHERE memoire.id_memoire IS NULL AND etudiant.id_etudiant IS NOT NULL", nativeQuery = true)
	List<ModelContrat> contratDispoMemoire();
	
	@Query(value = "SELECT * FROM contrat WHERE id_contrat NOT IN (SELECT id_contrat FROM etudiant)", nativeQuery = true)
	List<ModelContrat> contratDispoEtudiant();

}
