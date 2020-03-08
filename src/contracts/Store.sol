pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Store {
  struct Record{
    string fileName;
    string date;
    string fileHash;
  }
  mapping(string => uint) RecordCount;
  mapping(string => Record[]) medicalHistory;
  function set(string memory _id, string memory _fileName, string memory _date, string memory _fileHash) public {
    medicalHistory[_id].push(Record(_fileName,_date,_fileHash));
    RecordCount[_id] = RecordCount[_id]+1;
    // UserPolicyCountMap[username] = UserPolicyCountMap[username];
  }

  function get(string memory _id) public view returns (Record[] memory) {
    return medicalHistory[_id];
  }

  function getCount(string memory _id) public view  returns (uint) {
    return RecordCount[_id];
  }

  function clear(string memory _id) public {
    delete medicalHistory[_id];
  }
}