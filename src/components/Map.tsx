import { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import NavBar from "./NavBar";
import OrgCard from "./OrgFollow";
import { X } from "lucide-react";

const MAPTILER_KEY = "bs0qTCbmXadT9ZH0pr9h";

const styles = {
    street: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
    satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
} as const;

type Org = {
    id: string;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    followers: any;
};

type Tree = {
    id: string;
    latitude: number;
    longitude: number;
    imageUrl?: string;
    description?: string;
};


const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street");
    const [trees, setTrees] = useState<Tree[]>([]);
    const [orgs, setOrgs] = useState<Org[]>([]);
    const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);


    useEffect(() => {
        (async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`${BASE_URL}/api/eco-orgs`, { withCredentials: true });
                setOrgs(res.data);
                console.log(res)
            } catch (error) {
                console.error("Error fetching orgs:", error);
            }
        })();
    }, []);
    useEffect(() => {
        (async () => {
            try {
                // const BASE_URL = import.meta.env.VITE_BACKEND_URL;
                const res = await axios.get(`https://eco-social-production-00a1.up.railway.app/api/`, { withCredentials: true });
                setTrees(res.data);
                console.log(res)
            } catch (error) {
                console.error("Error fetching trees:", error);
            }
        })();
    }, []);

    
    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: styles.street,
            center: [77.209, 28.6139],
            zoom: 9,
        });
    }, []);


    useEffect(() => {
        map.current?.setStyle(styles[mapStyle]);
    }, [mapStyle]);

    
    useEffect(() => {
        if (!map.current || orgs.length === 0) return;
        orgs.forEach((org) => {
            const el = document.createElement("div");
            el.className = "custom-org-marker";
            el.title = org.name;

            el.addEventListener("click", () => setSelectedOrg(org));

            new maplibregl.Marker({ element: el, anchor: "bottom" })
                .setLngLat([org.longitude, org.latitude])
                .addTo(map.current!);
        });

    }, [orgs]);

    useEffect(() => {
        if (!map.current || trees.length === 0) return;

        trees.forEach((tree) => {
            // Custom HTML element for leafy emoji
            const marker = new maplibregl.Marker({ color: "#10B981" })
                .setLngLat([tree.longitude, tree.latitude])
                .addTo(map.current!);
        });

    }, [trees]);
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />

        
            <div ref={mapContainer} className="flex-1 w-full" />

            
            <button
                onClick={() =>
                    setMapStyle((p) => (p === "street" ? "satellite" : "street"))
                }
                className="
                            fixed
                            right-4 bottom-6
                            lg:bottom-auto lg:top-30 lg:right-6

                            inline-flex items-center justify-center
                            px-6 py-2
                            text-sm font-medium
                            bg-white shadow rounded-lg
                            hover:bg-gray-100
                            z-50
                            map-toggle-btn
                        "
            >
                {mapStyle === "street" ? "Satellite View" : "Street View"}
            </button>


    
            {selectedOrg && (
                <div className="fixed bottom-6 lg:bottom-auto lg:top-28 left-1/2 lg:left-8 -translate-x-1/2 lg:translate-x-0 w-[calc(100%-2rem)] sm:w-96 lg:w-80 max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow z-40">
                    <button
                        onClick={() => setSelectedOrg(null)}
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                        title="Close organization card"
                    >
                        <X size={20} />
                    </button>
                    <OrgCard org={selectedOrg} />
                </div>
            )}
        </div>
    );
};

export default Map;
