package com.example.flightreservation.model;

import jakarta.persistence.*;

@Entity
public class FlightTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private String address;
    private String destinationAddress;
    private String kickoffAddress;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    // Constructors
    public FlightTicket() {
    }

    public FlightTicket(String passengerName, String address, String destinationAddress, String kickoffAddress,
            Company company) {
        this.passengerName = passengerName;
        this.address = address;
        this.destinationAddress = destinationAddress;
        this.kickoffAddress = kickoffAddress;
        this.company = company;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public String getKickoffAddress() {
        return kickoffAddress;
    }

    public void setKickoffAddress(String kickoffAddress) {
        this.kickoffAddress = kickoffAddress;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
