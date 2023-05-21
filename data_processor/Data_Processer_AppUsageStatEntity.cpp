#include <iostream>
#include <iomanip>
#include <fstream>
#include <filesystem>

#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
#include <algorithm>

#define ll long long
#define pis pair<int, string>
#define ff first
#define ss second

using namespace std;
using std::filesystem::recursive_directory_iterator;

// list of directory ("AppUsageEventEntity" included)
vector<string> file_names;

// ifstream & ofstream
ifstream fin;
ofstream fout;

unordered_map<int, int> mp_user;

struct Usage_Info{
    string name;
    ll ttf;
};

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

void init(){
    for(int i = 1; i <= 81; i++) mp_user[user_list[i]] = i;
}

int get_dir(){
    for(const auto &file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/'); // replace '\' to '/'

        // Find AppUsageEventEntity files
        if(str_path.find("AppUsageStatEntity") == 141){
            file_names.push_back(str_path);

            //cout << str_path.substr(60) << endl;
        }
    }

    return EXIT_SUCCESS;
}

// input file open
void fin_open(string path){
    fin.open(path);
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
void fout_open(string path){
    fout.open(path);
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

int now_user, now_day;
unordered_set<string> st_app[82][8];
unordered_map<string, vector<int>> mp_app_timeline[82][8];
unordered_map<string, int> mp_app_totaltime[82][8];
ll total_time[82][8];
// 81 user, 7 days

vector<Usage_Info> vc_info;

void Input(){
    vc_info.clear();

    // Take one line at a time until reach the end of the file...
    string str_line;
    while(getline(fin, str_line)){
        // first & second ',' position
        int pos1 = str_line.find(",");
        int pos2 = str_line.find(",", pos1+1);
        int pos3 = str_line.find(",", pos2+1);
        int pos4 = str_line.find(",", pos3+1);
        int pos5 = str_line.find(",", pos4+1);
        int pos6 = str_line.find(",", pos5+1);
        int pos7 = str_line.find(",", pos6+1);
        int pos8 = str_line.find(",", pos7+1);

        // Extract app name from one row
        string str_stp = str_line.substr(0, pos1-1);
        string str_app = str_line.substr(pos1+1, pos2-pos1-1);
        string str_ttf = str_line.substr(pos8+1);

        //cout << str_ttf << endl;

        if(str_ttf == "totalTimeForeground") continue;

        bool flag = true;
        for(char c : str_ttf) flag &= isdigit(c);
        if(!flag) cout << str_ttf << endl;

        vc_info.push_back({str_app, stoll(str_ttf)});
    }
}

void Processing(){
    unordered_set<string> &st = st_app[now_user][now_day];
    unordered_map<string, vector<int>> &mp1 = mp_app_timeline[now_user][now_day];
    unordered_map<string, int> &mp2 = mp_app_totaltime[now_user][now_day];
    ll &tt = total_time[now_user][now_day];

    for(Usage_Info ui : vc_info){
        if(st.find(ui.name) == st.end()){
            st.insert(ui.name);
            mp1[ui.name] = vector<int>();
        }
        mp1[ui.name].push_back(ui.ttf);
    }

/*=============================================================================*/

    for(string name : st){
        //mp1[name].erase(unique(mp1[name].begin(), mp1[name].end()), mp1[name].end());

        mp2[name] = 0;

        //Method 1
        //for(ll ttf : mp1[name]) mp2[name] += ttf;

        //Method 2
        /*
        for(int i = 0; i < mp1[name].size()-1; i++){
            if(mp1[name][i] > mp1[name][i+1]) mp2[name] += mp1[name][i];
        }
        mp2[name] += mp1[name].back();
        */

        //Method 3
        ll mx = 0;
        for(ll ttf : mp1[name]) mx = max(mx, ttf);
        mp2[name] += mx; tt += mx;
    }

/*=============================================================================*/

    //printf("%d %d\n", now_user, now_day);
}

void Output(int i){
    fout << "[" << endl;
    for(int j = 1; j <= 7; j++){
        fout << "\t{" << endl;
        fout << "\t\t\"date\": " << j << "," << endl;
        fout << "\t\t\"totalTime\": " << total_time[i][j]/(60*1000) << "," << endl;
        fout << "\t\t\"details\": [" << endl;

        vector<pair<ll, string>> vc;
        for(string str : st_app[i][j]){
            if(mp_app_totaltime[i][j][str] < 60*1000) continue;
            vc.emplace_back(mp_app_totaltime[i][j][str]/(60*1000), str);
        }
        sort(vc.begin(), vc.end());
        reverse(vc.begin(), vc.end());

        for(pair<ll, string> it : vc) fout << "\t\t\t{\"appName\": \"" << it.ss << "\", \"usage\": " << it.ff << "}," << endl;

        fout << "\t\t]" << endl;
        fout << "\t}," << endl;
    }
    fout << "]" << endl;
}

int main(){
//  freopen("input.txt", "r", stdin);
//  freopen("output.txt", "w", stdout);

    init();
    get_dir();

    // Set UTF-8 Code Page Identifiers
    system("chcp 65001");

    for(string str : file_names){
        //cout << "Processing... " << str << endl;

        //st_app.clear();

        int next_user = mp_user[stoi(str.substr(136, 4))];
        if(now_user != next_user){
            now_user = next_user;
            now_day = 1;
        }
        else now_day++;

        if(!now_user) cout << str << endl;

        fin_open(str);
        Input();
        fin_close();

        Processing();
    }

    for(int i = 1; i <= 81; i++){
        string str = "C:/Users/jx2ha/Desktop/2-1/CS481/Week 11 (0508-0514)/results/json1/P";
        if(user_list[i] < 1000) str += "0";
        str += to_string(user_list[i]);
        str += ".json";

        cout << str << endl;

        fout_open(str);
        Output(i);
        fout_close();
    }

    return 0;
}