package ge.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryEtudiant extends JpaRepository<ge.model.ModelEtudiant, Long> {

	@Query(value = "SELECT niveau.libelle_niveau as niveau, count(*) as nombre_etudiant FROM etudiant JOIN niveau ON niveau.id_niveau = etudiant.id_niveau GROUP BY niveau.id_niveau; ", nativeQuery = true)
	List<Object> getNombreEtudiantByNiveau();
	
	@Query(value = "SELECT type_contrat.libelle_type_contrat as type_contrat, count(*) as nombre_etudiant FROM etudiant JOIN contrat ON contrat.id_contrat = etudiant.id_contrat JOIN type_contrat ON type_contrat.id_type_contrat = contrat.id_type_contrat GROUP BY type_contrat.id_type_contrat;  ", nativeQuery = true)
	List<Object> getNombreEtudiantByTypeContrat();
	
	@Query(value = "SELECT type_formation.libelle_type_formation as type_formation, count(*) as nombre_etudiant FROM etudiant JOIN type_formation ON type_formation.id_type_formation = etudiant.id_type_formation GROUP BY type_formation.id_type_formation; ", nativeQuery = true)
	List<Object> getNombreEtudiantByTypeFormation();
	
}
