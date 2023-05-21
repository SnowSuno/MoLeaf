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
    ll timestamp;
    string name, type;

    bool operator<(const Usage_Info &ui){
        return timestamp < ui.timestamp;
    }
};

void init(){
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

    for(int i = 1; i <= 81; i++) mp_user[user_list[i]] = i;
}

int get_dir(){
    for(const auto &file : recursive_directory_iterator("C:/Users/jx2ha/Desktop/2-1/CS481/Week 5 (0327-0402)/Dataset")){
        string str_path = file.path().string();
        replace(str_path.begin(), str_path.end(), '\\', '/'); // replace '\' to '/'

        // Find AppUsageEventEntity files
        if(str_path.find("AppUsageEventEntity") == 141){
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
        string str_stamp = str_line.substr(0, pos1-1);
        string str_app = str_line.substr(pos1+1, pos2-pos1-1);
        string str_type = str_line.substr(pos4+1, pos5-pos4-1);

        if(str_type != "MOVE_TO_FOREGROUND" && str_type != "MOVE_TO_BACKGROUND") continue;

        vc_info.push_back({stoll(str_stamp), str_app, str_type});
    }
}

void Processing(){
    unordered_set<string> &st = st_app[now_user][now_day];
    unordered_map<string, vector<int>> &mp1 = mp_app_timeline[now_user][now_day];
    unordered_map<string, int> &mp2 = mp_app_totaltime[now_user][now_day];
    ll &tt = total_time[now_user][now_day];

    sort(vc_info.begin(), vc_info.end());

    for(Usage_Info ui : vc_info){
        if(ui.type == "MOVE_TO_FOREGROUND"){
            if(st.find(ui.name) == st.end()){
                st.insert(ui.name);
                mp1[ui.name] = vector<int>();
                mp1[ui.name].push_back(ui.timestamp);
            }
            else if(~mp1[ui.name].size() & 1) mp1[ui.name].push_back(ui.timestamp);
        }
        if(ui.type == "MOVE_TO_BACKGROUND"){
            if(st.find(ui.name) == st.end()){
                st.insert(ui.name);
                mp1[ui.name] = vector<int>();
//                mp1[ui.name].push_back(ui.timestamp/(24*60*60*1000)*(24*60*60*1000));
//                mp1[ui.name].push_back(ui.timestamp);
            }
            else if(mp1[ui.name].size() & 1) mp1[ui.name].push_back(ui.timestamp);
        }
    }
    for(string name : st){
        if(mp1[name].size() & 1) mp1[name].push_back(mp1[name].back()/(24*60*60*1000)*(24*60*60*1000)+(24*60*60*1000));
    }

/*=============================================================================*/

    for(string name : st){
        mp2[name] = 0;
        for(int idx = 0; idx < mp1[name].size(); idx += 2){
            if(mp1[name][idx+1]-mp1[name][idx] > 12*60*60*1000) continue;
            mp2[name] += mp1[name][idx+1]-mp1[name][idx];
        }
    }

/*=============================================================================*/

    //printf("%d %d\n", now_user, now_day);
}

void Output(){
    for(int i = 1; i <= 81; i++){
        for(int j = 1; j <= 7; j++){
            vector<pair<ll, string>> vc;
            for(string str : st_app[i][j]){
                if(mp_app_totaltime[i][j][str] < 60*1000) continue;
                vc.emplace_back(mp_app_totaltime[i][j][str], str);
            }
            sort(vc.begin(), vc.end());
            reverse(vc.begin(), vc.end());

            for(pair<ll, string> it : vc) cout << i << " " << j << " " << it.ff/(60*1000) << " " << it.ss << endl;
        }
    }
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

    Output();

	return 0;
}