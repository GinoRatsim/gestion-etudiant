package ge.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "absences")
public class ModelAbsences {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_absences")
	@SequenceGenerator(name = "generator_absences", sequenceName = "_seq_absences")
	private Long idAbsences;
	@ManyToOne
	@JoinColumn(name = "id_etudiant", nullable = false)
	private ModelEtudiant etudiant;
	private Date dateDebutAbsences;
	private Date dateFinAbsences;
	private int estJustifie;
	
	
	public ModelAbsences() {
		super();
	}

	public ModelAbsences(Long idAbsences, ModelEtudiant etudiant, Date dateDebutAbsences, Date dateFinAbsences, int estJustifie) {
		super();
		this.idAbsences = idAbsences;
		this.etudiant = etudiant;
		this.dateDebutAbsences = dateDebutAbsences;
		this.dateFinAbsences = dateFinAbsences;
		this.estJustifie = estJustifie;
	}

	public Long getIdAbsences() {
		return idAbsences;
	}

	public void setIdAbsences(Long idAbsences) {
		this.idAbsences = idAbsences;
	}

	public ModelEtudiant getEtudiant() {
		return etudiant;
	}

	public void setEtudiant(ModelEtudiant etudiant) {
		this.etudiant = etudiant;
	}

	public Date getDateDebutAbsences() {
		return dateDebutAbsences;
	}

	public void setDateDebutAbsences(Date dateDebutAbsences) {
		this.dateDebutAbsences = dateDebutAbsences;
	}

	public Date getDateFinAbsences() {
		return dateFinAbsences;
	}

	public void setDateFinAbsences(Date dateFinAbsences) {
		this.dateFinAbsences = dateFinAbsences;
	}

	public int getEstJustifie() {
		return estJustifie;
	}

	public void setEstJustifie(int estJustifie) {
		this.estJustifie = estJustifie;
	}
	
}
