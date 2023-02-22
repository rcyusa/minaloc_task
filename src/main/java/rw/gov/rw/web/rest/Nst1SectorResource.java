package rw.gov.rw.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import rw.gov.rw.repository.Nst1SectorRepository;
import rw.gov.rw.service.Nst1SectorService;
import rw.gov.rw.service.dto.Nst1SectorDTO;
import rw.gov.rw.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link rw.gov.rw.domain.Nst1Sector}.
 */
@RestController
@RequestMapping("/api")
public class Nst1SectorResource {

    private final Logger log = LoggerFactory.getLogger(Nst1SectorResource.class);

    private static final String ENTITY_NAME = "nst1Sector";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Nst1SectorService nst1SectorService;

    private final Nst1SectorRepository nst1SectorRepository;

    public Nst1SectorResource(Nst1SectorService nst1SectorService, Nst1SectorRepository nst1SectorRepository) {
        this.nst1SectorService = nst1SectorService;
        this.nst1SectorRepository = nst1SectorRepository;
    }

    /**
     * {@code POST  /nst-1-sectors} : Create a new nst1Sector.
     *
     * @param nst1SectorDTO the nst1SectorDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nst1SectorDTO, or with status {@code 400 (Bad Request)} if the nst1Sector has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nst-1-sectors")
    public ResponseEntity<Nst1SectorDTO> createNst1Sector(@Valid @RequestBody Nst1SectorDTO nst1SectorDTO) throws URISyntaxException {
        log.debug("REST request to save Nst1Sector : {}", nst1SectorDTO);
        if (nst1SectorDTO.getId() != null) {
            throw new BadRequestAlertException("A new nst1Sector cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nst1SectorDTO result = nst1SectorService.save(nst1SectorDTO);
        return ResponseEntity
            .created(new URI("/api/nst-1-sectors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nst-1-sectors/:id} : Updates an existing nst1Sector.
     *
     * @param id the id of the nst1SectorDTO to save.
     * @param nst1SectorDTO the nst1SectorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nst1SectorDTO,
     * or with status {@code 400 (Bad Request)} if the nst1SectorDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nst1SectorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nst-1-sectors/{id}")
    public ResponseEntity<Nst1SectorDTO> updateNst1Sector(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Nst1SectorDTO nst1SectorDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Nst1Sector : {}, {}", id, nst1SectorDTO);
        if (nst1SectorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nst1SectorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nst1SectorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Nst1SectorDTO result = nst1SectorService.update(nst1SectorDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nst1SectorDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nst-1-sectors/:id} : Partial updates given fields of an existing nst1Sector, field will ignore if it is null
     *
     * @param id the id of the nst1SectorDTO to save.
     * @param nst1SectorDTO the nst1SectorDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nst1SectorDTO,
     * or with status {@code 400 (Bad Request)} if the nst1SectorDTO is not valid,
     * or with status {@code 404 (Not Found)} if the nst1SectorDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the nst1SectorDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nst-1-sectors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Nst1SectorDTO> partialUpdateNst1Sector(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Nst1SectorDTO nst1SectorDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Nst1Sector partially : {}, {}", id, nst1SectorDTO);
        if (nst1SectorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nst1SectorDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nst1SectorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Nst1SectorDTO> result = nst1SectorService.partialUpdate(nst1SectorDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, nst1SectorDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /nst-1-sectors} : get all the nst1Sectors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nst1Sectors in body.
     */
    @GetMapping("/nst-1-sectors")
    public ResponseEntity<List<Nst1SectorDTO>> getAllNst1Sectors(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Nst1Sectors");
        Page<Nst1SectorDTO> page = nst1SectorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /nst-1-sectors/:id} : get the "id" nst1Sector.
     *
     * @param id the id of the nst1SectorDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nst1SectorDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nst-1-sectors/{id}")
    public ResponseEntity<Nst1SectorDTO> getNst1Sector(@PathVariable Long id) {
        log.debug("REST request to get Nst1Sector : {}", id);
        Optional<Nst1SectorDTO> nst1SectorDTO = nst1SectorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nst1SectorDTO);
    }

    /**
     * {@code DELETE  /nst-1-sectors/:id} : delete the "id" nst1Sector.
     *
     * @param id the id of the nst1SectorDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nst-1-sectors/{id}")
    public ResponseEntity<Void> deleteNst1Sector(@PathVariable Long id) {
        log.debug("REST request to delete Nst1Sector : {}", id);
        nst1SectorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
