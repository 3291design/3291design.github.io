/* Version: 6.0.3 | Date: 2026-05-10 | Project: 2026 Factory Restoration */

(function() {
    const buildNav = () => {
        const target = document.getElementById('bikewales-nav-v6');
        if (!target) return;

        const url = window.location.href.toLowerCase();
        
       // Site Detection Logic
        const isRides    = url.includes('bikewalesrides');
        const isRoutes   = url.includes('bikewalesroutes');
        const isEvents   = url.includes('bikewalesevents');
        const isCharts   = url.includes('walescharts') || url.includes('bikeswalescharts'); 
        const isGallery  = url.includes('bikewalesgallery');
        const isAbout    = url.includes('bikewalesabout');
        
        // The Workshop/Gear fix
        const isWorkshop = url.includes('bikewalesgear') || url.includes('gear-home');
        
        // The "Catch-All" Home Logic
        const isMainDomain = url.includes('bikewales.blogspot.com');
        const isHome = isMainDomain && !(isRides || isRoutes || isEvents || isCharts || isGallery || isWorkshop || isAbout);

        target.innerHTML = `
<table class="navbar2" cellspacing="0" cellpadding="0" border="0">
<tr>
    <!-- HOME -->
    <td width="9%" class="dropdown ${isHome ? 'nav-active' : 'nav-inactive'}"><a href="https://bikewales.blogspot.com/">Home</a></td>
    
    <!-- MY RIDES -->
    <td width="12%" class="dropdown ${isRides ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">My Rides</a>
        <div class="dropdown-content">
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Ride Reports by Year:</a>
                <div class="dropdown-content2"  style="min-width: 170px !important;">
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/rides-by-year-2025.html">Ride Reports: <b>2025</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/rides-by-year-2024.html">Ride Reports: <b>2024</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/rides-by-year-2023.html">Ride Reports: <b>2023</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/rides-by-year-2022.html">Ride Reports: <b>2022</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2021.html">Ride Reports: <b>2021</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2020.html">Ride Reports: <b>2020</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2019.html">Ride Reports: <b>2019</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2018.html">Ride Reports: <b>2018</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2017.html">Ride Reports: <b>2017</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2016.html">Ride Reports: <b>2016</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2015.html">Ride Reports: <b>2015</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2014.html">Ride Reports: <b>2014</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2013.html">Ride Reports: <b>2013</b></a>
                    <a href="https://bikewalesrides-home.blogspot.com/2021/03/my-rides-rides-by-year-2012.html">Ride Reports: <b>2012</b></a>
                </div>
            </div>
            <a href="https://bikewalesrides-home.blogspot.com/2022/01/rides-to-remember.html">Rides to Remember</a>
            <a href="https://bikewalesrides-home.blogspot.com/2022/01/rides-to-z_10.html">Ride Reports: A to Z</a>
            <hr class="nav-hr" />
            <a href="https://bikewalesrides-archive.blogspot.com">Ride Archive: 2012 - 2020</a>
        </div>
    </td>

    <!-- ROUTES -->
    <td width="16%" class="dropdown ${isRoutes ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">Routes to Ride</a>
        <div class="dropdown-content" style="min-width: 260px;">
            <a href="https://bikewalesroutes-home.blogspot.com/2023/05/routes-to-ride-overview.html">Overview: South East Wales</a>
            <a href="https://bikewalesroutes-home.blogspot.com/2020/12/ncn-routes-in-south-east-wales_5.html">South East Wales: Complete List</a>
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Regional Routes:</a>
                <div class="dropdown-content2" style="min-width: 220px !important;">
                    <a href="https://bikewalesroutes-home.blogspot.com/2025/06/eastern-valleys.html">Eastern Valleys</a>
                    <a href="https://bikewalesroutes-home.blogspot.com/2026/07/western-valleys.html">Western Valleys</a>
                    <hr class="nav-hr" />
                    <a href="#" class="coming-soon"><i>Coming Soon!</i></a>
                    <a href="#" class="coming-soon">The Marches</a>
                    <a href="#" class="coming-soon">Cardiff &amp; Vale of Glamorgan</a>
                    <a href="#" class="coming-soon">Long Distance Routes</a>
                </div>
            </div>
            <hr class="nav-hr" />
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Bike Wales Custom Routes:</a>
                <div class="dropdown-content2" style="min-width: 180px !important;">
                    <a href="https://bikewalesroutes-home.blogspot.com/2020/11/beginner-routes.html">Beginner Routes</a>
                    <a href="https://bikewalesroutes-home.blogspot.com/2020/12/intermediate-routes.html">Intermediate Routes</a>
                    <a href="https://bikewalesroutes-home.blogspot.com/2020/12/advanced-routes.html">Advanced Routes</a>
                </div>
            </div>
        </div>
    </td>

    <!-- EVENTS -->
    <td width="11%" class="dropdown ${isEvents ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">Events</a>
        <div class="dropdown-content" style="min-width: 130px;">
            <a href="https://bikewalesevents-home.blogspot.com/2021/12/group-rides-500-topbutton.html">Group Rides</a>
            <a href="https://bikewalesevents-home.blogspot.com/2021/12/events-bike-hike-not-always-planned.html">Bike &amp; Hike</a>
            <a href="https://bikewalesevents-home.blogspot.com/2026/01/campouts.html">Campouts</a>
        </div>
    </td>

    <!-- CHARTS -->
    <td width="11%" class="dropdown ${isCharts ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">Charts</a>
        <div class="dropdown-content" style="min-width: 230px;">
            <a href="https://bikeswalescharts-home.blogspot.com/2023/01/overall-totals.html">Overall Cycling Totals</a>
            <div class="dropbtn2"><a href="#">&nbsp;&nbsp;&#9658;&nbsp;Cycling Totals by Year:</a> 
                <div class="dropdown-content2" style="min-width: 180px;">
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/12/2026-yearly-totals.html"><b>2026</b> Cycling Totals</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/01/2025-yearly-totals.html"><b>2025</b> Cycling Totals</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2024/01/2024-yearly-totals.html"><b>2024</b> Cycling Totals</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2023-yearly-totals_9.html"><b>2023</b> Cycling Totals</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2022-yearly-totals.html"><b>2022</b> Cycling Totals</a>
                </div>
            </div>
            <div class="dropbtn2"><a href="#">&nbsp;&nbsp;&#9658;&nbsp;Rides by Bike:</a> 
                <div class="dropdown-content2" style="min-width: 180px;">
                    <a href="https://bikeswalescharts-home.blogspot.com/2022/12/rides-by-bike.html"><b>Overview</b></a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/12/2026-rides-by-bike.html"><b>2026</b> Rides by Bike</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/01/2025-rides-by-bike.html"><b>2025</b> Rides by Bike</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/12/2024-rides-by-bike.html"><b>2024</b> Rides by Bike</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2023-rides-by-bike.html"><b>2023</b> Rides by Bike</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2022-rides-by-bike.html"><b>2022</b> Rides by Bike</a>
                </div>
            </div>    
            <div class="dropbtn2"><a href="#">&nbsp;&nbsp;&#9658;&nbsp;Solitaires:</a> 
                <div class="dropdown-content2" style="min-width: 150px;">
                    <a href="https://bikeswalescharts-home.blogspot.com/2022/12/solitaires-overview.html"><b>Overview</b></a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/12/2026-solitaires.html"><b>2026</b> Solitaires</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2024/12/2025-solitaires.html"><b>2025</b> Solitaires</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/12/2024-solitaires.html"><b>2024</b> Solitaires</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2023-solitaires.html"><b>2023</b> Solitaires</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2023/01/2022-solitaires.html"><b>2022</b> Solitaires</a>
                </div>
            </div>
            <a href="https://bikeswalescharts-home.blogspot.com/2022/12/100-mile-club.html">100 Mile Cycling Club</a> 
            <hr class="nav-hr" />
            <a href="https://bikeswalescharts-home.blogspot.com/2026/02/overall-walking-totals.html">Overall Walking Totals</a>
            <div class="dropbtn2"><a href="#">&nbsp;&nbsp;&#9658;&nbsp;Walking Totals by Year:</a> 
                <div class="dropdown-content2" style="min-width: 180px;">
                    <a href="https://bikeswalescharts-home.blogspot.com/2025/12/2026-yearly-walking.html"><b>2026</b> Yearly Walking</a>
                    <a href="https://bikeswalescharts-home.blogspot.com/2024/12/2025-walking-totals.html"><b>2025</b> Yearly Walking</a>
                </div>
            </div>
            <hr class="nav-hr" />
            <a href="https://bikewalescharts.blogspot.com/2022/01/chart-archive.html">Chart Archive: 2012 - 2021</a> 
        </div>
    </td>

    <!-- GALLERY -->
    <td width="11%" class="dropdown ${isGallery ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">Gallery</a>
        <div class="dropdown-content" style="min-width: 230px;">
            <a href="https://bikewalesgallery-home.blogspot.com/2022/01/gallery.html">Main Collection</a>
            <a href="https://bikewalesgallery-home.blogspot.com/2026/03/best-of-year.html">Best of Year</a>
            <a href="https://bikewalesgallery-home.blogspot.com/2026/03/historic-architecture.html">Historic Architecture</a>
            <hr class="nav-hr" />
            <a href="https://bikewalesgallery.blogspot.com/2022/02/gallery-archive.html">Gallery Archive: 2012-2021</a>
        </div>
    </td>

    <!-- WORKSHOP -->
    <td style="width: 12%;" class="dropdown ${isWorkshop ? 'nav-active' : 'nav-inactive'}">
        <a href="#" class="dropbtn">Workshop</a>
        <div class="dropdown-content" style="min-width: 230px;">
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Desktop:</a>
                <div class="dropdown-content2" style="min-width: 210px;">
                    <a href="https://bikewalesgear-home.blogspot.com/2026/04/online-project-list.html">Online Project List</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2026/04/ride-reports.html">Outstanding: Ride Reports</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2026/04/routes-to-ride.html">Future: Routes to Ride</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2026/04/future-places-to-visit.html">Future: Places to Visit</a>
                </div>
            </div>
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Workbench:</a>
                <div class="dropdown-content2" style="min-width: 210px;">
                    <a href="https://bikewalesgear-home.blogspot.com/2026/04/mechanical-project-list.html">Mechanical Project List</a>
                    <a href="https://bikewalesgear-home.blogspot.com/p/gear-calculator-1983.html">Gear Ratio Calculator</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2022/05/parts-accessories.html">Parts &amp; Accessories</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2022/05/service-maintenance-records.html">Service Records</a>
                </div>
            </div>
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Goals &amp; Achievements:</a>
                <div class="dropdown-content2" style="min-width: 210px;">
                    <a href="https://bikewalesrides-home.blogspot.com/p/2026-goals_23.html"><b>⤷ 2026</b> Goals</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2025-achievements.html"><b>2025</b> Achievements</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2025-goals.html"><b>⤷ 2025</b> Goals</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2024-achievements.html"><b>2024</b> Achievements</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2024-goals.html"><b>⤷ 2024</b> Goals</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2023-achievements.html"><b>2023</b> Achievements</a>
                    <a href="https://bikewalesrides-home.blogspot.com/p/2022-achievements.html"><b>2022</b> Achievements</a>
                 </div>
            </div>
            <div class="dropbtn2"><a href="#">&#9658;&nbsp;Bikes:</a>
                <div class="dropdown-content2" style="min-width: 210px;">
                    <a href="https://bikewalesgear-home.blogspot.com/2022/01/2011-dawes-ultra-galaxy.html">2011 Dawes Galaxy</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2022/01/1979-trek-412.html">1979 TREK 412</a>
                    <a href="https://bikewalesgear-home.blogspot.com/2023/01/1995-raleigh-alaska.html">1995 Raleigh Custom</a>
                </div>
            </div>
        </div>
    </td>

    <!-- ABOUT -->
    <td width="9%" class="dropdown ${isAbout ? 'nav-active' : 'nav-inactive'}"><a href="https://bikewalesabout.blogspot.co.uk/">About</a></td>
</tr>
</table>
<hr style="margin:0; border:0; border-top:1px solid #ccc;" />
        `;
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildNav);
    } else {
        buildNav();
    }
})();



