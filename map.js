/**
    *Author: Ethan McEvoy
    *Date: 2024-06-01
**/

document.addEventListener('DOMContentLoaded', function () {

    // ✅ Initialize map FIRST
    const map = L.map('map').setView([42.2428, -97.014], 16);

    // Base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // 🎨 Color logic
    function getColor(status) {
        if (status === "OK") return "green";
        if (status === "In need") return "red";
        if (status === "responding") return "blue";
        return "grey"; // default for unknown status
    }

    function getData(status, name) {
        if (status === "Responding"){
            return {
                beds
            }; 
        };

        if (status === "In need") {
            return {
                population: population,
                affected: affected 
            };          
        }

        if (status === "OK"){
            return {
                poplations: population
            }
        }

        return estimates[name] || "about 20 minutes";
    }

    // ✅ Load GeoJSON (ONLY map data now)
    fetch('map.geoJson')
        .then(res => res.json())
        .then(data => {

            L.geoJSON(data, {

                style: function (feature) {
                    return {
                        color: getColor(feature.properties.status),
                        weight: 5
                    };
                },
            }).addTo(map);

        })
        .catch(err => {
            console.error("Error loading GeoJSON:", err);
        });

});
