#include <iostream>
#include <iomanip>
#include <fstream>
#include <filesystem>
#include <regex>

#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>
using namespace std;
using std::filesystem::recursive_directory_iterator;

/*====================================================================================================================*/

// ifstream & ofstream
ifstream fin;
ofstream fout;

// input file open
void fin_open(string str_path){
    fin.open(str_path);
    if(fin.fail()){
		cerr << "Input Error!" << endl;
        exit(0);
	}
}

// input file close
void fin_close(){
    fin.close();
}

// output file open
void fout_open(string str_path){
    fout.open(str_path);
    if(fout.fail()){
		cerr << "Output Error!" << endl;
        exit(0);
	}

    fout << fixed;
    fout.precision(3);
}

// output file close
void fout_close(){
    fout.close();
}

/*====================================================================================================================*/

// list of directory ("AppUsageEventEntity" included)
vector<string> file_names;

int get_dir(){
    for(const auto &file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/'); // replace '\' to '/'

        // Find AppUsageEventEntity & DeviceEventEntity files
        if(str_path.find("AppUsageEventEntity") == 141 || str_path.find("DeviceEventEntity") == 141)
            file_names.push_back(str_path);
    }

    return EXIT_SUCCESS;
}

/*====================================================================================================================*/

int user_list[82] = {
    0,
    701, 702, 703, 704, 705,
    706, 707, 708, 709, 710,
    711, 712, 713, 714, 715,
    716, 717, 718, 719, 721,
    722, 723, 724, 725, 726,
    727, 728, 729,
    1501, 1502, 1503, 1504, 1505,
    1506, 1507, 1508, 1509, 1510,
    1511, 1514, 1515, 1516, 1517,
    1518, 1519, 1520, 1521, 1522,
    1523, 1525, 1526, 1527, 1541,
    3001, 3002, 3003, 3004, 3005,
    3007, 3008, 3009, 3010, 3011,
    3012, 3013, 3014, 3015, 3016,
    3017, 3018, 3019, 3021, 3022,
    3023, 3024, 3025, 3027, 3028,
    3029, 3030, 3041
};

unordered_map<int, int> mp_user;

void init(){
    for(int i = 1; i <= 81; i++) mp_user[user_list[i]] = i;
}

/*====================================================================================================================*/

#define ll long long

#define msl unordered_map<string, ll>
#define psl pair<string, ll>
#define vpsl vector<psl>

#define mil unordered_map<int, ll>
#define pil pair<int, ll>
#define vpil vector<pil>

#define vi vector<int>
#define msvi unordered_map<string, vi>
#define psvi pair<string, vi>
#define vpsvi vector<psvi>

#define ff first
#define ss second

int user, date;
ll totalTime_usage[82][8];
msl totalTime_details[82][8];
ll pickups_usage[82][8];
mil downTime_usages[82][8];
msvi downTime_details[82][8];
ll maxTime_usage[82][8];
msl maxTime_details[82][8];
ll avgTime_usage[82][8];
msl avgTime_details[82][8];
ll lastPickup_time[82][8];

struct App_Usage_Info{
    ll timestamp;
    string name;
    bool type;

    bool operator<(const App_Usage_Info &ui){
        return timestamp < ui.timestamp;
    }
};

vector<App_Usage_Info> vc_app_info;

int sum[82][8], mx[82][8], day[82][8], hour[82][8][24];
// 81 user, 7 days

struct Device_Usage_Info{
    ll timestamp;
    bool type;

    bool operator<(const Device_Usage_Info &ui){
        return timestamp < ui.timestamp;
    }
};

vector<Device_Usage_Info> vc_device_info;

#define SEC 1000
#define MIN (60*SEC)
#define HR (60*MIN)
#define DAY (24*HR)

/*====================================================================================================================*/

void Input_AppUsageEventEntity(){
    vc_app_info.clear();

    // Take one line at a time until reach the end of the file...
    bool flag_first = true;
    string str_line;
    while(getline(fin, str_line)){
        if(flag_first){
            flag_first = false;
            continue;
        }

        // first & second ',' position
        int pos1 = str_line.find(",");
        int pos2 = str_line.find(",", pos1+1);
        int pos3 = str_line.find(",", pos2+1);
        int pos4 = str_line.find(",", pos3+1);
        int pos5 = str_line.find(",", pos4+1);

        // Extract app name from one row
        string str_timestamp = str_line.substr(0, pos1);
        string str_name = str_line.substr(pos1+1, pos2-pos1-1);
        string str_type = str_line.substr(pos4+1, pos5-pos4-1);

        if(str_type != "MOVE_TO_FOREGROUND" && str_type != "MOVE_TO_BACKGROUND") continue;

        vc_app_info.push_back({stoll(str_timestamp), str_name, str_type == "MOVE_TO_FOREGROUND"});
    }
}

void Processing_AppUsageEventEntity(){
    unordered_set<string> st; // list of app
    unordered_map<string, vector<ll>> mp; // timestamp of app

    sort(vc_app_info.begin(), vc_app_info.end());

    string last_name = "";
    for(App_Usage_Info ui : vc_app_info){
        if(ui.type){
            if(st.find(ui.name) == st.end()){
                st.insert(ui.name);
                mp[ui.name] = vector<ll>();
                mp[ui.name].push_back(ui.timestamp);
                last_name = ui.name;
            }
            else if(~mp[ui.name].size() & 1){
                if(last_name != "") mp[last_name].push_back(ui.timestamp);
                mp[ui.name].push_back(ui.timestamp);
                last_name = ui.name;
            }
        }
        else{
            if(st.find(ui.name) == st.end()){
                st.insert(ui.name);
                mp[ui.name] = vector<ll>();
                mp[ui.name].push_back(ui.timestamp/DAY*DAY);
                mp[ui.name].push_back(ui.timestamp);
            }
            else if(mp[ui.name].size() & 1){
                if(ui.name == last_name){
                    mp[ui.name].push_back(ui.timestamp);
                    last_name = "";
                }
            }
        }
    }
    if(last_name != "") mp[last_name].push_back(mp[last_name].back()/DAY*DAY+DAY);

/*=============================================================================*/

    msl &td = totalTime_details[user][date];
    msvi &dd = downTime_details[user][date];
    msl &md = maxTime_details[user][date];
    msl &ad = avgTime_details[user][date];

    for(string name : st){
        vector<bool> used(24, false);
        for(int i = 0; i < mp[name].size(); i += 2){
            td[name] += mp[name][i+1]-mp[name][i];
            md[name] = max(md[name], mp[name][i+1]-mp[name][i]);
            ad[name]++;

            for(int j = 0; j < 24; j++){
                ll st = max(mp[name][i]%DAY, (ll)j*HR);
                ll ed = min(mp[name][i+1]%DAY, (ll)(j+1)*HR);
                if(ed-st > 0) used[j] = true;
            }
        }

        vector<int> vc;
        for(int i = 0; i < 24; i++){
            if(used[i]) vc.push_back(i);
        }
        dd[name] = vc;
        ad[name] = td[name]/ad[name];
/*
        if(td[name] < MIN){
            td.erase(name);
            dd.erase(name);
            md.erase(name);
            ad.erase(name);
        }
*/
    }
}

void Input_DeviceEventEntity(){
    vc_device_info.clear();

    // Take one line at a time until reach the end of the file...
    string str_line;
    while(getline(fin, str_line)){
        // first & second ',' position
        int pos = str_line.find(",");

        // Extract app name from one row
        string str_timestamp = str_line.substr(0, pos);
        string str_type = str_line.substr(pos+1);

        //cout << str_ttf << endl;

        if(str_type != "SCREEN_ON" && str_type != "SCREEN_OFF") continue;

        vc_device_info.push_back({stoll(str_timestamp), str_type == "SCREEN_ON"});
    }
}

void Processing_DeviceEventEntity(){
    sort(vc_device_info.begin(), vc_device_info.end());

    ll &tu = totalTime_usage[user][date];
    ll &pu = pickups_usage[user][date];
    mil &du = downTime_usages[user][date];
    ll &mu = maxTime_usage[user][date];
    ll &au = avgTime_usage[user][date];
    ll &lt = lastPickup_time[user][date];

    ll prev_timestamp = 0;
    if(!vc_device_info.empty() && !vc_device_info.front().type){
        prev_timestamp = vc_device_info.front().timestamp/DAY*DAY;

        tu += vc_device_info.front().timestamp-prev_timestamp;
        pu++;
        for(int i = 0; i < 24; i++){
            ll st = max(prev_timestamp%DAY, (ll)i*HR);
            ll ed = min(vc_device_info.front().timestamp%DAY, (ll)(i+1)*HR);
            du[i] += max(ed-st, 0ll);
        }
        mu = max(mu, vc_device_info.front().timestamp-prev_timestamp);
        lt = vc_device_info.front().timestamp-prev_timestamp;

        prev_timestamp = 0;
    }

    bool flag = false;
    for(Device_Usage_Info ui : vc_device_info){
        if(!flag && ui.type){
            prev_timestamp = ui.timestamp;
            flag = true;
        }
        else if(flag && !ui.type){
            tu += ui.timestamp-prev_timestamp;
            pu++;
            for(int i = 0; i < 24; i++){
                ll st = max(prev_timestamp%DAY, (ll)i*HR);
                ll ed = min(ui.timestamp%DAY, (ll)(i+1)*HR);
                du[i] += max(ed-st, 0ll);
            }
            mu = max(mu, ui.timestamp-prev_timestamp);
            lt = ui.timestamp-prev_timestamp;

            prev_timestamp = 0;
            flag = false;
        }
    }

    if(flag){
        ll next_timestamp = prev_timestamp/DAY*DAY+DAY;

        tu += next_timestamp-prev_timestamp;
        pu++;
        for(int i = 0; i < 24; i++){
            ll st = max(prev_timestamp, (ll)i*HR);
            ll ed = min(next_timestamp, (ll)(i+1)*HR);
            du[i] += max(ed-st, 0ll);
        }
        mu = max(mu, next_timestamp-prev_timestamp);
        lt = next_timestamp-prev_timestamp;

        prev_timestamp = 0;
        flag = false;
    }

    for(int i = 0; i < 24; i++){
        if(!du[i]) du.erase(i);
    }
    if(pu) au = tu/pu;
}

void Output(int i){
    fout << "[" << endl;
    for(int j = 1; j <= 7; j++){
        fout << "\t{" << endl;
        fout << "\t\t\"date\": " << j << "," << endl;

        fout << "\t\t\"totalTime\": {" << endl;
        fout << "\t\t\t\"usage\": " << totalTime_usage[i][j]/MIN << "," << endl;
        fout << "\t\t\t\"details\": [" << endl;
        vpsl vc1(totalTime_details[i][j].begin(), totalTime_details[i][j].end());
        sort(vc1.begin(), vc1.end(), [&](const psl &x, const psl &y){
            if(x.ss != y.ss) return x.ss > y.ss;
            return x.ff > y.ff;
        });
        int loop = vc1.size();
        for(psl it : vc1){
            fout << "\t\t\t\t{\"appName\": \"" << regex_replace(it.ff, regex("\t"), " ") << "\", \"usage\": " << it.ss/MIN << "}";
            if(--loop) fout << ",";
            fout << endl;
        }
        fout << "\t\t\t]" << endl;
        fout << "\t\t}," << endl;

        fout << "\t\t\"pickups\": {\"usage\": " << pickups_usage[i][j] << "}," << endl;

        fout << "\t\t\"downTime\": {" << endl; 
        fout << "\t\t\t\"usage\": [" << endl;
        vpil vc2(downTime_usages[i][j].begin(), downTime_usages[i][j].end());
        sort(vc2.begin(), vc2.end(), [&](const pil &x, const pil &y){
            return x.ff < y.ff;
        });
        loop = vc2.size();
        for(pil it : vc2){
            fout << "\t\t\t\t{\"hour\": \"" << it.ff << "\", \"usage\": " << it.ss/MIN << "}";
            if(--loop) fout << ",";
            fout << endl;
        }
        fout << "\t\t\t]," << endl;
        fout << "\t\t\t\"details\": [" << endl;
        vpsvi vc3(downTime_details[i][j].begin(), downTime_details[i][j].end());
        sort(vc3.begin(), vc3.end(), [&](const psvi &x, const psvi &y){
            if(x.ss.size() != y.ss.size()) return x.ss.size() > y.ss.size();
            return x.ff > y.ff;
        });
        loop = vc3.size();
        for(psvi it : vc3){
            fout << "\t\t\t\t{\"appName\": \"" << regex_replace(it.ff, regex("\t"), " ") << "\", \"usage\": [";
            int loop2 = it.ss.size();
            for(int it2 : it.ss){
                fout << it2;
                if(--loop2) fout << ", ";
            }
            fout << "]}";
            if(--loop) fout << ",";
            fout << endl;
        }
        fout << "\t\t\t]" << endl;
        fout << "\t\t}," << endl;

        fout << "\t\t\"maxTime\": {" << endl;
        fout << "\t\t\t\"usage\": " << maxTime_usage[i][j]/MIN << "," << endl;
        fout << "\t\t\t\"details\": [" << endl;
        vpsl vc4(maxTime_details[i][j].begin(), maxTime_details[i][j].end());
        sort(vc4.begin(), vc4.end(), [&](const psl &x, const psl &y){
            if(x.ss != y.ss) return x.ss > y.ss;
            return x.ff > y.ff;
        });
        loop = vc4.size();
        for(psl it : vc4){
            fout << "\t\t\t\t{\"appName\": \"" << regex_replace(it.ff, regex("\t"), " ") << "\", \"usage\": " << it.ss/MIN << "}";
            if(--loop) fout << ",";
            fout << endl;
        }
        fout << "\t\t\t]" << endl;
        fout << "\t\t}," << endl;

        fout << "\t\t\"avgTime\": {" << endl;
        fout << "\t\t\t\"usage\": " << avgTime_usage[i][j]/MIN << "," << endl;
        fout << "\t\t\t\"details\": [" << endl;
        vpsl vc5(avgTime_details[i][j].begin(), avgTime_details[i][j].end());
        sort(vc5.begin(), vc5.end(), [&](const psl &x, const psl &y){
            if(x.ss != y.ss) return x.ss > y.ss;
            return x.ff > y.ff;
        });
        loop = vc5.size();
        for(psl it : vc5){
            fout << "\t\t\t\t{\"appName\": \"" << regex_replace(it.ff, regex("\t"), " ") << "\", \"usage\": " << it.ss/MIN << "}";
            if(--loop) fout << ",";
            fout << endl;
        }
        fout << "\t\t\t]" << endl;
        fout << "\t\t}," << endl;

        fout << "\t\t\"lastPickup\": {\"time\": " << lastPickup_time[i][j]/MIN << "}" << endl;

        fout << "\t}";
        if(j != 7) fout << ",";
        fout << endl;
    }
    fout << "]" << endl;
}

int main(){
//  freopen("input.txt", "r", stdin);
//  freopen("output.txt", "w", stdout);

    get_dir();
    init();

    // Set UTF-8 Code Page Identifiers
    system("chcp 65001");

    for(string str_path : file_names){
        int next_user = mp_user[stoi(str_path.substr(136, 4))];
        if(user != next_user){
            user = next_user;
            date = 1;
        }
        else date = date%7+1;

        if(!user) cout << str_path << endl;

        fin_open(str_path);
        if(str_path.find("AppUsageEventEntity") == 141) Input_AppUsageEventEntity();
        if(str_path.find("DeviceEventEntity") == 141) Input_DeviceEventEntity();
        fin_close();

        if(str_path.find("AppUsageEventEntity") == 141) Processing_AppUsageEventEntity();
        if(str_path.find("DeviceEventEntity") == 141) Processing_DeviceEventEntity();
    }

    for(int i = 1; i <= 81; i++){
        string str_path = "C:/Users/jx2ha/Desktop/2-1/CS481/Week 11 (0508-0514)/results/json4/P";
        if(user_list[i] < 1000) str_path += "0";
        str_path += to_string(user_list[i]);
        str_path += ".json";

        cout << str_path << endl;

        fout_open(str_path);
        Output(i);
        fout_close();
    }

	return 0;
}