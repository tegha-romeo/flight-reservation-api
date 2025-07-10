package com.example.flightreservation.repository;

import com.example.flightreservation.model.FlightTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FlightTicketRepository extends JpaRepository<FlightTicket, Long> {
    List<FlightTicket> findByAddressContainingIgnoreCase(String address);

    List<FlightTicket> findByDestinationAddressContainingIgnoreCase(String destinationAddress);

    List<FlightTicket> findByKickoffAddressContainingIgnoreCase(String kickoffAddress);
}
